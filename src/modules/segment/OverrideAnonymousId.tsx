import { FC, useState, ChangeEvent, useCallback } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const OverrideAnonymousId: FC = () => {
  const [newAnonymousId, setNewAnonymousId] = useState<string>('');

  const handleChangeNewAnonymousId = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = e.target;
      setNewAnonymousId(value.trim());
    },
    [setNewAnonymousId]
  );

  const onAnonymousIdOverride = useCallback(() => {
    global?.analytics?.setAnonymousId(newAnonymousId);
    window.location.reload();
  }, [newAnonymousId]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-6">
        <Input className="min-h-min w-2/3" onChange={handleChangeNewAnonymousId} />
        <Button style="primary" className="my-auto" copy="Override anonymous id" onClick={onAnonymousIdOverride} />
      </div>
      <span className="text-gray-500 w-2/3">
        You can override the current visitors anonymous id with a new one if you want to fetch another profile from
        Segment
      </span>
    </div>
  );
};

export default OverrideAnonymousId;
