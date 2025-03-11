import ProspectorLogo from '@/app/ui/prospector-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className={styles.shape} />
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Prospector.</strong> The in house Queensland Resources Project Data management solution.</p>
            <p>brought to you by <strong>BANJ</strong>.</p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Go to Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
                src="/hero-image.jpg"
                width={1000}
                height={760}
                className="hidden md:block rounded-t-2xl drop-shadow-2xl"
                alt="Photograph of an Australian Outback Landscape taken in Middleton, Queensland."
            />
            <div className="container flex justify-end rounded-b-2xl px-4 bg-[#1f4656] text-gray-200">
                <small>Image Credit: Lobster1. Licensed under <a className="text-blue-400" href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></small>
            </div>
        </div>
      </div>
    </main>
  );
}
