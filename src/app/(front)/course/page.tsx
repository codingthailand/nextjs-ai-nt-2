import FeaturesCourse from "@/components/features-course";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/course
export default async function CoursePage() {
  const response = await fetch('https://api.codingthailand.com/api/course');
  const courseResponse = await response.json();

  return (
    <main>
      {/* {
        JSON.stringify(courseResponse.data)
      } */}
      {
        courseResponse.data.length > 0 && <FeaturesCourse courses={courseResponse.data} />
      }
    </main>
  );
}