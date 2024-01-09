import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Share2Icon, CopyIcon, Share1Icon } from '@radix-ui/react-icons';
import './styles.css';

type DropdownMenuProps = {
  copySweetLink: () => void;
  shareToTitter: () => void;
};

const DropdownMenuDemo = ({ copySweetLink, shareToTitter }: DropdownMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton toggles" aria-label="Customise options">
          <Share2Icon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item onClick={copySweetLink} className="DropdownMenuItem">
            <CopyIcon />
            <span style={{ marginLeft: 5 }}>링크 복사하기</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={shareToTitter} className="DropdownMenuItem">
            <Share1Icon />
            <span style={{ marginLeft: 5 }}>트위터에 공유하기</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
