import React, { useRef } from 'react';
import { Badge } from 'primereact/badge';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';

const CustomIcon = ({ menu, icon, value }) => {
  const op = useRef(null);

  return (
    <div>
      <i className={`pi pi-${icon} p-overlay-badge`} style={{ fontSize: '2rem' }} onClick={(e) => op.current.toggle(e)}>
        {value && <Badge value={value}></Badge>}
      </i>
      <OverlayPanel ref={op} id={`${icon}-menu`} showCloseIcon={false} dismissable={true}>
        <Menu model={menu} />
      </OverlayPanel>
    </div>
  );
};

export default CustomIcon;
