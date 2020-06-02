/// <reference path="MusicKitV1.d.ts" />
interface MusicKitConfig {
  initConfig : {
    developerToken : string
    app            : {
      name  : string
      build : string
    }
  },
  countryCode?     : string,
}

const initMusicKit = (config: MusicKitConfig) => {
  MusicKit.configure(config.initConfig)
  // https://help.apple.com/itc/musicspec/?lang=en#/itc740f60829
  const countryCode = config.countryCode ? config.countryCode : "jp"
  MusicKit.getInstance().api.storefrontId = countryCode
}

export default initMusicKit
