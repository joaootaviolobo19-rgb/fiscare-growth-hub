import { serviceNames } from "@/lib/landing-content";

export function ServiceMarquee() {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {serviceNames.map((name) => (
              <span className="marquee-item" key={name}>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
