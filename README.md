#Little clone of [Open Flood](https://github.com/GunshipPenguin/open_flood)

The default grid is 24x24 with 5 colors.
Example [here](https://kimi.rouage.fr/color-flood)

##Features (Todo) :

  - simple resolver with different algorithms
  - better controls
  - flexible elements
  
##Features implemented :

  - color changing algorithm
  - isometric representation
  - ability to rotate isometric representation with mouse (pan when holding ctrl key)

##Known bugs :

  - Coloring algorithm rely massively on recursion : on Firefox, a grid 100x100 can hardly be completed without a stack overflow.