import { NextRequest, NextResponse } from 'next/server';
import {
  ACCENT_MCP_TOOL_DEFS,
  executeAccentMcpTool,
  isAccentMcpTool,
} from '@/lib/accent/mcp-tools';

export const dynamic = 'force-dynamic';

const MCP_PROTOCOL_VERSION = '2025-03-26';
const MCP_SERVER_INFO = {
  name: 'accent-ui-mcp',
  version: '3.1.0',
};

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
}

function rpcResult(id: string | number | null, result: unknown) {
  return { jsonrpc: '2.0' as const, id, result };
}

function rpcError(id: string | number | null, code: number, message: string) {
  return { jsonrpc: '2.0' as const, id, error: { code, message } };
}

function dispatchSingle(msg: JsonRpcRequest) {
  if (!msg || typeof msg !== 'object' || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return rpcError(msg?.id ?? null, -32600, 'Invalid Request: expected JSON-RPC 2.0 envelope.');
  }
  const isNotification = msg.id === undefined;
  const id = msg.id ?? null;
  const method = msg.method;
  const params = (msg.params && typeof msg.params === 'object' ? msg.params : {}) as Record<string, unknown>;

  if (method.startsWith('notifications/')) return null;
  if (method === 'ping') return isNotification ? null : rpcResult(id, {});

  if (method === 'initialize') {
    return rpcResult(id, {
      protocolVersion:
        typeof params.protocolVersion === 'string' && params.protocolVersion.trim()
          ? params.protocolVersion
          : MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: MCP_SERVER_INFO,
      instructions:
        'Accént 3.1 Open-Source MCP Server. Exposes accent_search_patterns, accent_get_spec, accent_get_brand_contract, and accent_lint_code.',
    });
  }

  if (method === 'tools/list') {
    return rpcResult(id, { tools: ACCENT_MCP_TOOL_DEFS });
  }

  if (method === 'tools/call') {
    const toolName = String(params.name ?? '').trim();
    const args = (params.arguments && typeof params.arguments === 'object' ? params.arguments : {}) as Record<
      string,
      unknown
    >;
    if (!toolName || !isAccentMcpTool(toolName)) {
      return rpcError(id, -32602, `Unknown Accént MCP tool: ${toolName || '(empty)'}`);
    }
    try {
      const result = executeAccentMcpTool(toolName, args);
      return rpcResult(id, result);
    } catch (err: unknown) {
      const code =
        typeof (err as { rpcCode?: number })?.rpcCode === 'number'
          ? (err as { rpcCode: number }).rpcCode
          : -32603;
      return rpcError(id, code, err instanceof Error ? err.message : 'Tool execution failed.');
    }
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      transport: 'streamable-http',
      jsonrpc: '2.0',
      protocolVersion: MCP_PROTOCOL_VERSION,
      serverInfo: MCP_SERVER_INFO,
      tools: ACCENT_MCP_TOOL_DEFS.map((t) => ({ name: t.name, description: t.description })),
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(rpcError(null, -32700, 'Parse error: invalid JSON body.'), { status: 400 });
  }

  if (Array.isArray(body)) {
    const responses = body.map((item) => dispatchSingle(item as JsonRpcRequest)).filter(Boolean);
    if (responses.length === 0) return new NextResponse(null, { status: 202 });
    return NextResponse.json(responses, { status: 200 });
  }

  const response = dispatchSingle(body as JsonRpcRequest);
  if (response === null) return new NextResponse(null, { status: 202 });
  return NextResponse.json(response, { status: 200 });
}
