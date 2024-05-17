/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xt1CZaBtJd6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function AboutUsPage() {
  return (
    <>
      <section className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
        <img
          alt="Movie Theater"
          className="w-full h-full object-cover opacity-50"
          src="/placeholder.svg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="max-w-3xl text-lg">
            Welcome to our movie description website, where we provide in-depth
            reviews, actor profiles, and a comprehensive database of films to
            help you discover your next cinematic adventure.
          </p>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FilmIcon className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Movie Reviews</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Dive into our comprehensive movie reviews, where we analyze the
              latest releases and provide in-depth insights to help you make
              informed decisions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <UserIcon className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Actor Profiles</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Explore the lives and careers of your favorite actors, from
              up-and-coming stars to legendary icons, and discover the stories
              behind their most memorable performances.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <DatabaseIcon className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-bold">Movie Database</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Browse our extensive movie database, featuring a vast collection
              of films spanning various genres, eras, and countries, to find
              your next cinematic gem.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function FilmIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
