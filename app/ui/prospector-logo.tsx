import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { fira_sans } from '@/app/ui/fonts';

export default function ProspectorLogo() {
  return (
    <div
      className={`${fira_sans.className} flex flex-row items-center leading-none text-white`}
    >
      <CubeTransparentIcon className="h-12 w-12 rotate-[15deg] mr-3" />
      <p className="text-[44px]">Prospector</p>
    </div>
  );
}
