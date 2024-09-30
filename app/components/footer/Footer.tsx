import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="mt-32 bg-primary-light text-sm">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold">
              Adopt a <span className="text-primary">Pet</span>
            </Link>
            <p>Connecting loving homes with furry friends since 2024.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="">About Us</Link>
              <Link href="">Available Pets</Link>
              <Link href="">Adoption Process</Link>
              <Link href="">Volunteer</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <p>123 Adoption Street</p>
              <p>Petville, PA 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: test@test.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="flex gap-2">
              <a
                className="flex items-center justify-center rounded-md bg-white px-3 py-1"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/creaciones.morit4"
              >
                <FontAwesomeIcon
                  className="h-4 w-4 text-primary"
                  icon={faFacebookF}
                />
              </a>
              <a
                className="rounded-md bg-white px-3 py-2"
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/crea_morita"
              >
                <FontAwesomeIcon
                  className="h-5 w-5 text-primary"
                  icon={faInstagram}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-primary-light-hover flex flex-col items-center gap-2 border-t py-8 sm:flex-row sm:justify-between">
          <p>© 2024 Adopt a Pet. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="">Privacy Policy</Link>
            <Link href="">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
