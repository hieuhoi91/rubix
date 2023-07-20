import { FC, useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  eyeEnable?: boolean;
}

const Input: FC<IInput> = (props) => {
  const [isHidden, setHidden] = useState<boolean>(false);
  const { type, eyeEnable, ...parentAttributes } = props;
  const HiddenPassword = () => {
    setHidden(!isHidden);
  };
  const getType = () => {
    if (type) {
      return type;
    } else {
      return !isHidden ? 'password' : props.type;
    }
  };

  return (
    <div className='relative flex h-[56px] w-full items-center justify-between rounded border border-gray-300'>
      <input
        {...parentAttributes}
        className=' border-color-transparent h-full w-full rounded px-3 outline-none'
        type={getType()}
      />
      {eyeEnable ? (
        !isHidden ? (
          <span
            className='absolute right-4 cursor-pointer text-2xl text-gray-400'
            onClick={HiddenPassword}
          >
            <MdOutlineVisibility />
          </span>
        ) : (
          <span
            className='absolute right-4 cursor-pointer text-2xl text-gray-400'
            onClick={HiddenPassword}
          >
            <MdOutlineVisibilityOff />
          </span>
        )
      ) : null}
    </div>
  );
};

export default Input;
