export const TOGGLE_SETTING = 'TOGGLE_SETTING';
export const CHANGE_SETTING = 'CHANGE_SETTING';

export interface Setting {
    name: string,
    value: boolean
}

export interface SettingState {
    [index: string]: boolean
}

interface ChangeSettingAction {
    type: typeof CHANGE_SETTING,
    payload: Setting
}

interface ToggleSettingAction {
    type: typeof TOGGLE_SETTING,
    name: string // payload
}

export type SettingAction = ChangeSettingAction | ToggleSettingAction;

/**
 * Change a setting value
 * payload.name: name of the setting prop to change
 * payload.value: new value to apply
 */
export function changeSetting(payload: Setting): SettingAction {
    return { type: CHANGE_SETTING, payload };
}

/**
 * Toggle a setting value (only boolean)
 */
export function toggleSetting(name: string): SettingAction {
    return { type: TOGGLE_SETTING, name };
}