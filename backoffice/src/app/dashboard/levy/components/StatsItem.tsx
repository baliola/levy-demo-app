import type { ReactElement } from "react";
import { RxArrowUp } from "react-icons/rx";
import { TbArrowsUpDown } from "react-icons/tb";
import { VscLoading } from "react-icons/vsc";

interface IStatItemProps {
  name: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isTime?: boolean;
}

const StatItem = ({ props }: { props: IStatItemProps }): ReactElement => {
  const { name, value, isTime } = props;

  return (
    <div
      title={name}
      className="border rounded-lg border-gray-300 dark:border-dark-border dark:bg-dark-card flex xl:flex py-4 px-6 lg:px-3 xl:px-6 gap-x-6 transition-colors duration-500 h-24"
    >
      {/* Desktop */}

      {/* Mobile and Large Desktop */}

      <props.icon
        className={`"lg:hidden xl:block text-primary my-auto w-9 h-9 lg:w-8 lg:-8 xl:w-10 xl:h-10 aspect-square transition-colors duration-500" `}
      ></props.icon>
      <div className="flex flex-col h-full gap-y-3 lg:hidden xl:flex">
        <span
          className={`text-sm capitalize transition-colors duration-500 truncate`}
        >
          {name}
        </span>
        {value ? (
          <p
            className={`text-2xl text-primary font-semibold transition-colors duration-500 truncate flex gap-x-1 `}
          >
            <span>{value}</span>
          </p>
        ) : (
          <VscLoading className="grow block h-6 w-6 text-primary transition-colors duration-500 animate-spin" />
        )}
      </div>
    </div>
  );
};

export default StatItem;
