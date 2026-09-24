import { Button, Card, CardBody, Input, Textarea, Badge } from "@/components/ui";

export default function StyleGuidePage() {
  return (
    <div className="section-padding mx-auto max-w-4xl space-y-12 px-6">
      <section>
        <h2 className="mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Book Free Demo</Button>
          <Button variant="secondary">View Details</Button>
          <Button variant="outline">Learn More</Button>
          <Button variant="whatsapp">WhatsApp Us</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" isLoading>Submitting</Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="gold">RO Purification</Badge>
          <Badge variant="aqua">Alkaline</Badge>
          <Badge variant="neutral">NEW</Badge>
          <Badge variant="success">CONVERTED</Badge>
          <Badge variant="warning">FOLLOW_UP</Badge>
          <Badge variant="danger">NOT_INTERESTED</Badge>
        </div>
      </section>

      <section>
        <h2 className="mb-4">Card</h2>
        <Card className="max-w-sm">
          <CardBody>
            <h4>Sample Product Card</h4>
            <p className="mt-1 text-sm">Verifying radius, border, and hover shadow.</p>
          </CardBody>
        </Card>
      </section>

      <section>
        <h2 className="mb-4">Form Inputs</h2>
        <div className="max-w-md space-y-4">
          <Input label="Full Name" placeholder="Rahul Sharma" />
          <Input label="Mobile Number" placeholder="9876543210" error="Enter a valid 10-digit mobile number" />
          <Textarea label="Address" placeholder="Flat / House no, street, area" />
        </div>
      </section>
    </div>
  );
}