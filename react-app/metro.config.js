const { getDefaultConfig } = require('expo/metro-config')

const {
  resolver: { sourceExts, assetExts }
} = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg' && ext !== 'db'),
    sourceExts: [...sourceExts, 'svg']
  }
}
