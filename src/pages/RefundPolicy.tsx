import Layout from "@/components/layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <section className="py-24 bg-secondary">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              Policy
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6 text-foreground">
              Returns & Refund Policy
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-3xl space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            At Twentiies, we are committed to delivering high-quality, intentionally designed fashion pieces. If you are not completely satisfied with your purchase, we're here to help.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-heading font-semibold text-foreground">1. Returns Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">We accept returns under the following conditions:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Items must be returned within 7 days of delivery.</li>
              <li>Items must be unused, unworn, unwashed, and in original condition.</li>
              <li>Original tags and packaging must be intact.</li>
              <li>Proof of purchase is required.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Twentiies reserves the right to reject returns that do not meet these conditions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-heading font-semibold text-foreground">2. Refund Process</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once your return is received and inspected: if approved, refunds will be processed to the original payment method within 5–10 business days. Shipping fees are non-refundable unless the item received was defective or incorrect.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
