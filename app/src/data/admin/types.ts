export interface NavItem {
  key: string;
  label: string;
  icon: string;
}

export interface Account {
  name: string;
  role: string;
}

export interface TopBarNotification {
  icon: string;
  color: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}
