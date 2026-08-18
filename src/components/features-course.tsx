/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

type Props = {
  courses: any[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="mx-auto text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
          No complex configs. Just copy, paste, and start building
        </p>
        <div className="mt-18 grid w-full gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              className="flex w-full flex-col text-start"
              key={course.title}
            >
              <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-xl sm:mb-6">
                <Image
                  alt={course.title}
                  className="size-full bg-muted object-cover"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                  loading="eager"
                />
              </div>
              <div className="px-1">
                <span className="font-medium text-[22px] tracking-[-0.015em]">
                  {course.title}
                </span>
                <p className="mt-1 max-w-[25ch] text-[17px] text-muted-foreground">
                  {course.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCourse;
