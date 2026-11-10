import CourseView from '../../../components/CourseView';
import { COURSES } from '../../../lib/data';
export const dynamicParams = false;
export function generateStaticParams() { return COURSES.map((c) => ({ slug: c.slug })); }
export default async function Page({ params }) {
  const { slug } = await params;
  return <CourseView slug={slug} />;
}
