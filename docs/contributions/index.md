# Contribuciones

### Commit

Usamos ["semantic release library"](https://www.npmjs.com/package/semantic-release) (https://www.npmjs.com/package/semantic-release) para generar nuestras nuevas versiones, tags y changelogs. Para esto necesitamos specificar un mensaje en los commits con un formato que permita determinar que version es aumentada, y tambien ayudar a mejorar el CHANGELOG.md

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |
