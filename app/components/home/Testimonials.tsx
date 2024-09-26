import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="px-4">
      <div className="m-auto flex max-w-[1200px] flex-col items-center justify-center gap-12 py-16 text-center md:py-32">
        <h2 className="text-4xl font-bold">Happy Tails</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-md">
              <Image
                src={`${process.env.AWS_BUCKET_URL}/assets/woman.jpg`}
                alt="testimonial person 1"
                className="aspect-square w-[100px] rounded-full bg-gray-100"
                width={100}
                height={100}
              />
              <p className="italic">
                &quot;Adopting Max was the best decision we ever made. He&apos;s
                brought so much joy to our family!&quot;
              </p>
              <p className="font-semibold">Sarah Johnson</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-md">
              <Image
                src={`${process.env.AWS_BUCKET_URL}/assets/man.jpg`}
                alt="testimonial person 1"
                className="aspect-square w-[100px] rounded-full bg-gray-100"
                width={100}
                height={100}
              />
              <p className="italic">
                &quot;The adoption process was smooth and the staff was
                incredibly helpful. We couldn&apos;t be happier with our new
                cat, Luna.&quot;
              </p>
              <p className="font-semibold">Michael Chen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
