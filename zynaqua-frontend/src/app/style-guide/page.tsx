import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CardBody,
  Checkbox,
  Input,
  Section,
  SectionHeading,
  Select,
  StatusBadge,
  Textarea,
} from "@/components/ui";
import { LEAD_STATUS_META } from "@/lib/status";
import { SheetDemo } from "./SheetDemo";

export default function StyleGuidePage() {
  return (
    <div className="space-y-12">
      <Section tone="warm" containerClassName="max-w-4xl">
        <SectionHeading
          eyebrow="Design foundation"
          title="Shared components"
          description="A practical showcase of the reusable primitives used across ZynAqua."
          align="center"
          withRules
        />
      </Section>

      <div className="page-container max-w-4xl space-y-12 pb-16">
        <section>
          <SectionHeading title="Buttons" />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {(["primary", "secondary", "outline", "whatsapp", "ghost"] as const).map((variant) => (
              <Button key={variant} variant={variant} size="md">{variant}</Button>
            ))}
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">+</Button>
            <Button isLoading loadingText="Saving">Loading</Button>
            <Button disabled>Disabled</Button>
            <ButtonLink href="/products" variant="outline">Internal link</ButtonLink>
            <ButtonLink href="https://wa.me/9227119282" variant="whatsapp">External link</ButtonLink>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Labels" title="Badges" withRules />
          <div className="mt-4 flex flex-wrap gap-2">
            {(["neutral", "gold", "aqua", "info", "success", "warning", "danger"] as const).map((variant) => (
              <Badge key={variant} variant={variant}>{variant}</Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(LEAD_STATUS_META) as Array<keyof typeof LEAD_STATUS_META>).map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Cards" />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Card><CardBody>Default white card</CardBody></Card>
            <Card interactive><CardBody>Interactive card</CardBody></Card>
            <Card accentTop tone="warm"><CardBody>Warm accent card</CardBody></Card>
          </div>
        </section>

        <section>
          <SectionHeading title="Form controls" />
          <div className="mt-4 grid max-w-2xl gap-4 sm:grid-cols-2">
            <Input label="Name" placeholder="Normal input" />
            <Input label="Helper text" helperText="We only use this to contact you." />
            <Input label="Error" error="Please enter a valid value." />
            <Input label="Disabled" disabled value="Unavailable" readOnly />
            <Textarea label="Message" placeholder="Normal textarea" />
            <Select label="Select">
              <option>Choose an option</option>
              <option>One</option>
            </Select>
            <Checkbox label="I agree to be contacted." />
            <Checkbox label="Disabled checkbox" disabled />
          </div>
        </section>

        <section>
          <SectionHeading title="Section headings" eyebrow="Left aligned" description="Descriptions remain readable and align with the heading." />
          <div className="mt-8">
            <SectionHeading title="Centered heading" eyebrow="Centered" description="This description centers itself without caller hacks." align="center" />
          </div>
        </section>

        <section>
          <SectionHeading title="Section tones" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Section tone="white" className="rounded-2xl border"><SectionHeading title="White" /></Section>
            <Section tone="aqua" className="rounded-2xl"><SectionHeading title="Aqua" /></Section>
            <Section tone="dark" className="rounded-2xl"><SectionHeading title="Dark" /></Section>
          </div>
        </section>

        <section>
          <SectionHeading title="Sheet" />
          <div className="mt-4"><SheetDemo /></div>
        </section>
      </div>
    </div>
  );
}
