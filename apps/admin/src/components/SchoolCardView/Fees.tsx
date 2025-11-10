import type { SchoolFees } from '@/types/School2.type';
import { Badge } from '../ui/badge';

const FeesCardContent = ({ section }: { section?: SchoolFees }) => {
  if (!section) return null;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Tuition Fees</p>
        <div className="flex flex-col gap-2 mt-1">
          {section.tuitionFees?.length > 0 ? (
            section.tuitionFees.map((feeItem, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-2 hover:shadow-sm transition"
              >
                <span className="font-medium text-sm">{feeItem.title}</span>
                <span className="text-sm">
                  {feeItem.price} {feeItem.currency}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tuition fees provided</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Additional Fees</p>
        <div className="flex flex-col gap-2 mt-1">
          {section.additionalFees?.length > 0 ? (
            section.additionalFees.map((feeItem, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-2 hover:shadow-sm transition"
              >
                <span className="font-medium text-sm">{feeItem.title}</span>
                <span className="text-sm">
                  {feeItem.price} {feeItem.currency}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No additional fees provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeesCardContent;
