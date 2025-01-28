import CTAButton from "@/components/lib/CTAButton";
import CommunityHubImportItemSteps from "../..";
import { Warning } from "@phosphor-icons/react";

export default function UnknownItem({ item, setSettings, setStep }) {
  return (
    <div className="flex flex-col mt-4 gap-y-4">
      <div className="w-full flex items-center gap-x-2">
        <Warning size={24} className="text-red-500" />
        <h2 className="text-base text-red-500 font-semibold">
          Unsupported item
        </h2>
      </div>
      <div className="flex flex-col gap-y-[25px] text-white/80 text-sm custom-text-secondary">
        <p>
          We found an item in the community hub, but we don't know what it is or
          it is not yet supported for import into {process.env.APPLICATION_FALLBACK_NAME}.
        </p>
        <p>
          The item ID is: <b>{item.id}</b>
          <br />
          The item type is: <b>{item.itemType}</b>
        </p>
        <p>
          Please contact support via email if you need help importing this item.
        </p>
      </div>
      <CTAButton
        className="text-dark-text w-full mt-[18px] h-[34px] custom-theme-bg-quad custom-theme-color-quad"
        onClick={() => {
          setSettings({ itemId: null, item: null });
          setStep(CommunityHubImportItemSteps.itemId.key);
        }}
      >
        Try another item
      </CTAButton>
    </div>
  );
}
