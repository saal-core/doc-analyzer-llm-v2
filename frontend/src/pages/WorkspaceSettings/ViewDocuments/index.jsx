import useApi from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import Workspace from "@/models/workspace";
import PreLoader from "@/components/Preloader";
import { useTranslation } from "react-i18next";
import { Eye, File } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";
import Drawer from "@/components/Drawer";
const ViewDocuments = ({ slug, workspace }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, data, invoke } = useApi({
    method: Workspace.getWorkspaceDocuments,
  });
  const { t } = useTranslation();
  useEffect(() => {
    invoke(slug);
  }, []);

  return (
    <div className="">
      <div className="flex flex-col">
        <label htmlFor="name" className="block input-label">
          {t("workspace-documents.title")}
        </label>
        <p className="text-white text-opacity-60 text-xs font-medium py-1.5">
          {t("workspace-documents.description")}
        </p>
      </div>
      <table className="w-full  text-sm text-left rounded-lg">
        <thead className="text-white text-opacity-80 text-xs leading-[18px] font-bold uppercase border-white/10 border-b border-opacity-60">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-tl-lg">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Uploaded Date
            </th>
            <th scope="col" className="px-6 py-3">
              Word Count
            </th>
            <th scope="col" className="px-6 py-3">
              Token Count Estimate
            </th>
            <th scope="col" className="px-6 py-3 rounded-tr-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="flex flex-col justify-center items-center min-h-full">
              <PreLoader size="16" />
            </div>
          ) : data?.data?.length > 0 ? (
            data?.data.map((document, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-3 flex items-center gap-{8px}">
                    <File className="h-4 w-4" />
                    <div>{document?.title}</div>
                  </td>
                  <td className="px-6 py-3">{document?.createdAt}</td>
                  <td className="px-6 py-3">{document?.wordCount}</td>
                  <td className="px-6 py-3">
                    {document?.token_count_estimate}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="font-bold hover:bg-gray-100 p-1 rounded-full"
                      data-tooltip-id="view-document"
                      data-tooltip-content="View document content"
                      onClick={() => setIsOpen(true)}
                    >
                      <Tooltip
                        id="view-document"
                        place="top"
                        delayShow={300}
                        className="tooltip !text-xs z-99"
                      />
                      <Eye className="h-4 w-4 font-bold" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center py-4 text-white/80" colSpan="4">
                No Documents uploaded in this workspace
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default ViewDocuments;
