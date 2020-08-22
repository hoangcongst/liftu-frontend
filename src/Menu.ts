export interface ISidebarMenuItem {
    heading?: string;
    name?: string;
    icon?: string;
    translate?: string;
    path?: string;
    label?: {
        value: string | number;
        color: string;
    };
    submenu?: ISidebarMenu;
}

export interface ISidebarMenu extends Array<ISidebarMenuItem> {}

const Menu: ISidebarMenu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Welcome',
        path: 'welcome',
        icon: 'icon-grid',
        translate: 'sidebar.nav.WELCOME'
    },
    {
        name: 'Components',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.COMPONENTS',
        label: { value: 4, color: 'info' },
        submenu: [
            {
                name: 'Buttons',
                path: 'buttons'
            },
            {
                name: 'Forms',
                path: 'form-standard'
            },
            {
                name: 'Tables',
                path: 'table-standard'
            },
            {
                name: 'Cards',
                path: 'cards'
            }
        ]
    }
];

export default Menu;
