const production = process.env.NODE_ENV === "production"

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  purge: production ? ["./src/**/*.tsx"] : false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
