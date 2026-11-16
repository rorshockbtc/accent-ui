import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--a-radius-cta,6px)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap t-press t-color outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        sky: "bg-[var(--a-sky)] text-[var(--a-sky-fg)] hover:opacity-90 border-[#111827]/20",
        "sky-ice":
          "bg-[var(--a-sky-surface)] text-[var(--a-sky-ink)] border-[var(--a-sky)]/35 hover:border-[var(--a-sky-text)]",
        commercial:
          "bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] hover:bg-[var(--a-accent-fill-hover)] border-[#111827] shadow-[3px_3px_0px_#111827] dark:shadow-[3px_3px_0px_#F3EFE9] hover:-translate-y-0.5",
      },
      size: {
        default:
          "min-h-[44px] gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "min-h-[44px] gap-1 px-3 text-[13px] in-data-[slot=button-group]:rounded-none has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "min-h-[44px] gap-1 px-3.5 text-[13px] in-data-[slot=button-group]:rounded-none has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-[48px] gap-1.5 px-5 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon: "size-11 min-h-[44px] min-w-[44px]",
        "icon-xs":
          "size-11 min-h-[44px] min-w-[44px] in-data-[slot=button-group]:rounded-none [&_svg:not([class*='size-'])]:size-4",
        "icon-sm":
          "size-11 min-h-[44px] min-w-[44px] in-data-[slot=button-group]:rounded-none",
        "icon-lg": "size-12 min-h-[48px] min-w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
