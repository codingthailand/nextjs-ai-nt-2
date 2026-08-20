import { Suspense } from "react";
import FeaturesCourse from "@/components/features-course";
import AppLoading from "../components/app-loading";

// http://localhost:3000/course
async function CourseContent() {
  const response = await fetch("https://api.codingthailand.com/api/course");
  const courseResponse = await response.json();

  return courseResponse.data.length > 0 ? (
    <FeaturesCourse courses={courseResponse.data} />
  ) : null;
}

export default function CoursePage() {
  return (
    <main>
      <Suspense fallback={<AppLoading />}>
        <CourseContent />
      </Suspense>
    </main>
  );
}
