import type { SchoolFees } from '@/types/School2.type';
import React from 'react';

const FeesCardContent = ({ section }: { section?: SchoolFees }) => {
  if (!section) return null;

  const tuitionFees =
    section?.feeItems?.filter((feeItem) => feeItem.isAdditionalFee === false) ?? [];

  const additionalFees =
    section?.feeItems?.filter((feeItem) => feeItem.isAdditionalFee === true) ?? [];

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Tuition Fees</p>
          {tuitionFees.map((feeItem, index: number) => (
            <>
              <div key={index} className="flex  items-start">
                <h3 className="font-medium">{feeItem.title}</h3>={' '}
                <h2>
                  {feeItem.price} {feeItem.currency}
                </h2>
              </div>
            </>
          ))}
          {tuitionFees.length === 0 && <p className="text-sm ">No tuition fees provided</p>}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Additional Fees</p>
          {additionalFees.map((feeItem, index: number) => (
            <>
              <div key={index} className="flex  items-start">
                <h3 className="font-medium">{feeItem.title}</h3>={' '}
                <h2>
                  {feeItem.price} {feeItem.currency}
                </h2>
              </div>
            </>
          ))}
          {additionalFees.length === 0 && <p className="text-sm ">No additional fees provided</p>}
        </div>
      </div>
    </>
  );
};

export default FeesCardContent;
