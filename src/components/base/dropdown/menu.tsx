import React, { useState } from "react";
import { useCallback } from "react";
import styled from "@emotion/styled";
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";
import { MButton } from "../MButton";

type MenuProps = AppCommonChild & {
  Icon: React.ReactNode;
};

export const MenuMenuContainer = styled.div<{ show: boolean }>(
  ({ theme, show }) => ({
    display: show ? "flex" : "none",
    zIndex: theme.zIndex.menu,
    transition: "box-shadow 03s ease",
    
  })
);

const MenuListMenu = ({ children }: AppCommonChild) => {
  const { show, props, close } = useDropdownMenu({
    flip: true,
    offset: [0, 24],
  });
  return (
    <MenuMenuContainer
      {...props}
      style={{ ...props.style, opacity: 1, pointerEvents: "all" }}
      role="menu"
      show={show}
    >
      {children}
    </MenuMenuContainer>
  );
};

const MenuToggle = ({ Icon }: { Icon: any }) => {
  const [props, { toggle }] = useDropdownToggle();

  return (
    <MButton {...props} onClick={() => toggle(false)}>
      {Icon}
    </MButton>
  );
};

export const MenuSelectInput = ({ Icon, ...props }: MenuProps) => {
  const [show, setShow] = useState(false);
  const onToggle = useCallback(() => {
    setShow((prevProps) => !prevProps);
  }, []);

  return (
    <Dropdown
      {...props}
      drop="down"
      show={show}
      onToggle={onToggle}
      itemSelector="button:not(:disabled)"
    >
      {({ dp }: any) => (
        <div {...dp} style={{ position: "relative" }}>
          <MenuToggle Icon={Icon} />
          <MenuListMenu>{props.children}</MenuListMenu>
        </div>
      )}
    </Dropdown>
  );
};
