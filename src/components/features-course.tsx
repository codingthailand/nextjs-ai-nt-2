/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {
  courses: any[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Learn & Grow
        </span>
        <h2 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em]">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          No complex configs. Just copy, paste, and start building
        </p>
      </div>

      <div className="mt-14 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.title}
            size="elevated"
            className="overflow-hidden p-0 transition-shadow hover:shadow-[0_14px_32px_rgba(217,70,239,0.12),0_6px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-2xl">
              <Image
                alt={course.title}
                className="size-full bg-muted object-cover transition-transform duration-300 group-hover/card:scale-105"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={course.picture}
                loading="eager"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <span className="w-fit rounded-full bg-[#FDF4FF] px-3 py-1 text-xs font-bold text-primary">
                Course
              </span>
              <h3 className="font-heading text-lg font-semibold tracking-[0.005em]">
                {course.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {course.detail}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCourse;