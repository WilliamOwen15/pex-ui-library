import { Title } from "@/components/glide/title";

export default function TitleExamplesPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="font-bold font-serif text-5xl text-slate-900">
            Glide Title Component
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            A highly versatile Title component that replicates Glide Apps&apos;
            functionality. Supports multiple variants, sizes, and image fill
            options.
          </p>
        </div>

        {/* Simple Variant Examples */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Simple Variant
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Simple - Default Size */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Default Size (No Image)
              </p>
              <Title subtitle="Subtitle goes here" title="Example Title" />
            </div>

            {/* Simple - Compact Size */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Compact Size (No Image)
              </p>
              <Title
                size="compact"
                subtitle="Subtitle goes here"
                title="Example Title"
              />
            </div>

            {/* Simple with Image - Default */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Default Size + Image (Horizontal Layout)
              </p>
              <Title
                imageUrl="https://cdn.prod.website-files.com/5f048698055f743dd87fba6e/682ef430ce3c446c34956937_Home_Image01.webp"
                subtitle="Subtitle goes here"
                title="Example Title"
              />
            </div>

            {/* Simple with Image - Compact */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Compact Size + Image (Horizontal Layout)
              </p>
              <Title
                imageUrl="https://cdn.prod.website-files.com/5f048698055f743dd87fba6e/682ef43062e5fb2d19cfd56d_Home_Image02.webp"
                size="compact"
                subtitle="Subtitle goes here"
                title="Example Title"
              />
            </div>

            {/* Simple with Emphasis */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                With Emphasis
              </p>
              <Title
                emphasis="EMPHASIS"
                subtitle="Subtitle goes here"
                title="Example Title"
              />
            </div>

            {/* Simple with Emphasis + Image */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                With Emphasis + Image
              </p>
              <Title
                emphasis="CATEGORY"
                imageUrl="https://cdn.prod.website-files.com/5f048698055f743dd87fba6e/682ef430a305b23a15e999f0_Home_Image03.webp"
                subtitle="Subtitle goes here"
                title="Example Title"
              />
            </div>

            {/* Simple - Title Only */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Title Only (Empty State Handling)
              </p>
              <Title title="Example Title" />
            </div>

            {/* Simple - Long Text with Image */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Long Text + Image (Testing Layout)
              </p>
              <Title
                emphasis="FEATURED"
                imageUrl="https://cdn.prod.website-files.com/5f048698055f743dd87fba6e/682ef42da57a0eb08e1395e7_Home_Image04.webp"
                subtitle="This is a longer subtitle to test how the text wraps next to the image in the horizontal layout"
                title="Long Title Example"
              />
            </div>
          </div>
        </section>

        {/* Image Variant Examples */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Image Variant (Horizontal Layout)
          </h2>

          <div className="grid gap-8">
            {/* Image - Default with Photo */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Default with Image
              </p>
              <Title
                imageAlt="ImageAltExample"
                imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                subtitle="Subtitle goes here"
                title="Example Title"
                variant="image"
              />
            </div>

            {/* Image - Compact with Photo */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Compact with Image
              </p>
              <Title
                imageAlt="ImageAltExample"
                imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
                size="compact"
                subtitle="Subtitle goes here"
                title="Example Title"
                variant="image"
              />
            </div>

            {/* Image - With Emphasis */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                With Emphasis
              </p>
              <Title
                emphasis="EMPHASIS"
                imageAlt="ImageAltExample"
                imageUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop"
                subtitle="Subtitle goes here"
                title="Example Title"
                variant="image"
              />
            </div>

            {/* Image - Empty State (No Image Provided) */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Empty State (No Image)
              </p>
              <Title
                subtitle="Subtitle goes here"
                title="Example Title"
                variant="image"
              />
            </div>

            {/* Image - Object Fit Demo */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Object-Fit (Contain) - Shows padding and letterboxing
              </p>
              <Title
                imageAlt="Logo example"
                imageFill="fit"
                imageUrl="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=500&fit=crop"
                subtitle="The image is contained with visible padding"
                title="Contained Image"
                variant="image"
              />
            </div>

            {/* Long Text Truncation */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Text Truncation
              </p>
              <Title
                imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                subtitle="This is a very long subtitle that should also truncate when it reaches the edge of the container instead of wrapping to multiple lines"
                title="This is a very long title that should truncate elegantly when it reaches the maximum width"
                truncate
                variant="image"
              />
            </div>
          </div>
        </section>

        {/* Cover Variant Examples */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Cover Variant (Background Image)
          </h2>

          <div className="grid gap-8">
            {/* Cover - Default with Background */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="px-8 pt-6 pb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Default Size
              </p>
              <Title
                className="min-h-[300px] rounded-xl"
                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                subtitle="Explore the wilderness"
                title="Mountain Adventure"
                variant="cover"
              />
            </div>

            {/* Cover - Compact */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="px-8 pt-6 pb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Compact Size
              </p>
              <Title
                className="min-h-[250px] rounded-xl"
                imageUrl="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=400&fit=crop"
                size="compact"
                subtitle="Urban exploration"
                title="City Lights"
                variant="cover"
              />
            </div>

            {/* Cover - With Emphasis */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="px-8 pt-6 pb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                With Emphasis
              </p>
              <Title
                className="min-h-[300px] rounded-xl"
                emphasis="Iceland"
                imageUrl="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&h=400&fit=crop"
                subtitle="Land of fire and ice"
                title="Featured Destination"
                variant="cover"
              />
            </div>

            {/* Cover - Empty State */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="px-8 pt-6 pb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Empty State (No Image)
              </p>
              <Title
                className="min-h-[250px] rounded-xl"
                subtitle="Graceful fallback when no image is provided"
                title="Placeholder Cover"
                variant="cover"
              />
            </div>

            {/* Cover - Object Fit */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <p className="px-8 pt-6 pb-4 font-medium text-slate-500 text-xs uppercase tracking-wide">
                Object-Fit (Contain) - Image with padding inside cover
              </p>
              <Title
                className="min-h-[300px] rounded-xl"
                imageFill="fit"
                imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop"
                subtitle="The background image is contained with visible edges"
                title="Contained Cover"
                variant="cover"
              />
            </div>
          </div>
        </section>

        {/* Profile Variant Examples */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Profile Variant (Centered with Avatar)
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile - Default */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                Default Size
              </p>
              <Title
                imageAlt="Alex Thompson"
                imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                subtitle="Product Manager at TechCorp"
                title="Alex Thompson"
                variant="profile"
              />
            </div>

            {/* Profile - Compact */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                Compact Size
              </p>
              <Title
                imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
                size="compact"
                subtitle="UX Designer"
                title="Jamie Lee"
                variant="profile"
              />
            </div>

            {/* Profile - With Emphasis */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                With Emphasis
              </p>
              <Title
                emphasis="Jordan Smith"
                imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
                subtitle="Last login: 2 hours ago"
                title="Welcome back,"
                variant="profile"
              />
            </div>

            {/* Profile - Empty State */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                Empty State (No Image)
              </p>
              <Title
                subtitle="No profile picture"
                title="Anonymous User"
                variant="profile"
              />
            </div>

            {/* Profile - Object Fit */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                Object-Fit (Contain) - Useful for logos
              </p>
              <Title
                imageFill="fit"
                imageUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=300&fit=crop"
                subtitle="Image contained with padding"
                title="Logo Style"
                variant="profile"
              />
            </div>

            {/* Profile - Minimal */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-center font-medium text-slate-500 text-xs uppercase tracking-wide">
                Title Only
              </p>
              <Title
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                title="Guest User"
                variant="profile"
              />
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Usage Examples
          </h2>

          <div className="overflow-x-auto rounded-xl bg-slate-900 p-8">
            <pre className="text-slate-100 text-sm">
              <code>{`// Simple variant
<Title
  title="Project Dashboard"
  subtitle="Track your progress"
/>

// Image variant with emphasis
<Title
  variant="image"
  title="Current Sprint"
  emphasis="Sprint 24"
  subtitle="14 tasks remaining"
  imageUrl="https://example.com/image.jpg"
/>

// Cover variant
<Title
  variant="cover"
  title="Mountain Adventure"
  subtitle="Explore the wilderness"
  imageUrl="https://example.com/cover.jpg"
/>

// Profile variant (compact)
<Title
  variant="profile"
  title="Alex Thompson"
  subtitle="Product Manager"
  imageUrl="https://example.com/avatar.jpg"
  size="compact"
/>

// Custom styling
<Title
  title="Custom Title"
  className="max-w-md mx-auto"
/>`}</code>
            </pre>
          </div>
        </section>

        {/* Props Reference */}
        <section className="space-y-6">
          <h2 className="font-semibold text-2xl text-slate-800">
            Props Reference
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-slate-200 border-b">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Prop
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Default
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">title</td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">-</td>
                  <td className="px-4 py-3 text-slate-600">
                    Main title text (required)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    emphasis
                  </td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">-</td>
                  <td className="px-4 py-3 text-slate-600">
                    Large emphasized text (optional)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    subtitle
                  </td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">-</td>
                  <td className="px-4 py-3 text-slate-600">
                    Subtitle text (optional)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    imageUrl
                  </td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">-</td>
                  <td className="px-4 py-3 text-slate-600">
                    Image URL (optional)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    variant
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    &apos;simple&apos; | &apos;image&apos; | &apos;cover&apos; |
                    &apos;profile&apos;
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    &apos;simple&apos;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Layout style</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">size</td>
                  <td className="px-4 py-3 text-slate-600">
                    &apos;default&apos; | &apos;compact&apos;
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    &apos;default&apos;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Component size</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    imageFill
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    &apos;fill&apos; | &apos;fit&apos;
                  </td>
                  <td className="px-4 py-3 text-slate-600">&apos;fill&apos;</td>
                  <td className="px-4 py-3 text-slate-600">
                    Image object-fit behavior
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    imageAlt
                  </td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">&apos;&apos;</td>
                  <td className="px-4 py-3 text-slate-600">
                    Alt text for image
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    truncate
                  </td>
                  <td className="px-4 py-3 text-slate-600">boolean</td>
                  <td className="px-4 py-3 text-slate-600">false</td>
                  <td className="px-4 py-3 text-slate-600">
                    Truncate title and subtitle with ellipsis
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    className
                  </td>
                  <td className="px-4 py-3 text-slate-600">string</td>
                  <td className="px-4 py-3 text-slate-600">-</td>
                  <td className="px-4 py-3 text-slate-600">
                    Additional CSS classes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="py-12 text-center text-slate-500">
          <p>
            Built with Next.js, Tailwind CSS, CVA, and inspired by Glide Apps
          </p>
        </div>
      </div>
    </div>
  );
}
