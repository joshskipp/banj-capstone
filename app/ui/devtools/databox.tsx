import {CommandLineIcon} from "@heroicons/react/24/outline";

export default function Databox(rawData: any) {
    return (
        <div className="border-2 rounded-xl overflow-hidden mt-5">
            <div className="flex items-center p-1 pl-2 gap-2 bg-[#214656] text-white">
                <CommandLineIcon className="w-8"/>
                <h4 className="font-mono ">Dev Tools</h4>
            </div>
            <div className="p-2">
            <textarea cols={80} className="dev"  readOnly rows={10}
                      value={JSON.stringify(rawData.rawData)}>
            </textarea>
            </div>
        </div>
    )
}