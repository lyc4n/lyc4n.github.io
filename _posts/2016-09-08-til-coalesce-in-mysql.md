---
layout: post
title: 'TIL: Coalesce in MySQL'
---

If you look up the word **Coalesce** in the dictionary you would see the
following:

1. to unite so as to form one mass, community
2. to blend or come together

In MySQL **COALESCE()** is a comparison operator that returns the first non
null argument fed to it. This removes the need to use if statements in
determining the value that has to be returned.

Example:

    People Table

    Id      Name       college    high_school      elementary
    ---     ---        ---        ---              ---
    1       Juan       Univ A     HS A             Elem A
    2       Pedro                                  Elem A
    3       Dada                  HS B             Elem A
    4       Pepito     Univ B     HS C             Elem B
    5       Maria                                  Elem C

Say we have the People table and we'd like to see which school the everybody got their highest educational attainment. We execute the following statement wich uses COALESCE:


`Select id, name, COALESCE(college, high_school, elementary) as
highest_ed_school from people;`

Then we get a result like:


    Id      Name       highest_ed_school
    ---     ---        ---
    1       Juan       Univ A
    2       Pedro      Elem A
    3       Dada       HS B
    4       Pepito     Univ B
    5       Maria      Elem C
