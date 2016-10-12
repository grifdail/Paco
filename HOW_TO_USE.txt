How to use
=========

Basic Usage
----------------

A game is composed of multiple scenes. You can select and create them on the left panel.
The currently selected scene is displayed in the center preview, along with its settings on the right panel. You'll find three tabs there.
The first one, **Params** allow you to change the general settings of the brick (for now, there's only its background image)
The second one, **Images**, let you create and set up images. These images are effectively the links between your scenes, allowing the player to move between them.
The last, **Action** is where you can set up actions that will be executed at the begin of the game. More on that on the _action_ section below.

In the Image tab, you have the ability to create and add images. None exist by default.
Selecting an image open up three more tabs.
In the first, **Params** you can set up the position and dimension of the object as well as the image that we'll be used. Note that the placeholder image is only present in the editor and will be displayed as an error in the actual game.
In **Action** you can create the action that will be executed when the player click on the image. See _action_
**Condition** allow you to set up condition that will control if image is displayed or not according to a variable. If multiple condition is set up, all of them need to be true for the image to display. See _condition_

### Variables

variables are numbers that can change during the game. Then can be modified by actions and are used in condition to show or hide images.
They all start at 0 at the beginning of the game.

### Action

Actions are what define what happens when certain event occurs. For instance, when a scene is loaded, or when a user clicks an image. They can be used to move between scene but also to manipulate variables. They are always executed in order.

goTo
:   Move to the scene specified

load
: Add the content of the specified scene to the current scene. All the images' conditions still apply. The scene's actions will also be executed.

setVariable
: Set the selected variable to the specified value

incrementVariable
: Add the value to the selected variable

multitiplyVariable
: Multiply the selected variable by amount

toogleVariable
: Toggle the selected variable (setting it to 1 if it's 0, or to 0, if it's different than 0)

### Condition

conditions compare a variable with a predefined value to determine if an image will be displayed.

+ less
+ lessOrEqual
+ greater
+ greaterOrEqual
+ equal
+ different

Export
---------

Just upload the content of your game folder to your favorite host. Some services will require you to bundle the game into an archive like a zip. It only needs a web server. The game doesn't use any of the brand new JS features and _should_ run on most browsers. Offline mode isn't supported yet.


I want to ...
------------

#### Edit the name of a scene
Just select it on the top panel and click its name on the right panel.

#### Edit the name of an Image
Same as the scene. Select it, then click on its name on the editor panel.

#### Add a Life Bar
First create an empty scene. Name it `life bar`.
Add as many images as you'd like of life bar state. For instance, if you want your players to have 10 HP, add 10 images. Name them appropriately.
Then, for each of them add a condition: `life is less or equal to` (The value being the number of the image). You may want to use `equal` if you have separate images for each of the life bar state.

#### Reload a scene
Just use `goTo` to move to the current scene

#### Open up a different project

Just click the cross at the top of the scene panel.

Suggestions
-----------------

+ You should not work on the origin scene and only use it to set up your variable and load the first actual scene.
+ Gifs are supported !
+ Name your scenes and your object. It's harder to find `image #16` inside scene `BJZiR4nA` that to find `Monkey` inside `jungle`
+ Load is extremely powerful. If you have anything in common between two scenes, just put them in another scene and load that.
+ There's no way to unload a scene. You could reload the current scene instead by using a goTo action.
+ Actions are interrupted while changing scene. This mean you can load something into a different scene.
