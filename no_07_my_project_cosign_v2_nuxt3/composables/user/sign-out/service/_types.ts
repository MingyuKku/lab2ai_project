const DeviceTypeEnum = {
    web: 'WEB',
    non: 'NON',
    aos: 'AOS',
    ios: 'IOS',
} as const;

export type DeviceType = typeof DeviceTypeEnum[keyof typeof DeviceTypeEnum];