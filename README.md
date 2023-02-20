# A Journey To the Unkown

An AI driven procedural text based sci-fi adventure.

<div style="display:flex; justify-content: center">
<image src="https://github.com/au-re/AJTU/blob/main/website/public/logo192.png?raw=true">
</div>

The game idea was generated by ChatGPT:

```
A Journey To the Unknown

In the game, you play as a member of a space exploration team that has been sent to a distant planet to search for alien life and valuable resources. The catch is that the planet's environment is constantly changing and unpredictable, so the AI on your spaceship must generate new environments, creatures, and events in real-time.

As you explore the planet, you will encounter strange creatures, mysterious ruins, and unexpected challenges. You will have to make choices that affect the outcome of the story, and interact with the AI system to gather information, solve puzzles, and uncover the secrets of the planet. The AI system will respond to your actions and create a unique story based on your choices.

The images and music in the game will also be generated by AI, creating a unique visual and auditory experience for each playthrough. The music will adapt to your actions and the changing environments, creating a dynamic and immersive soundscape.

With procedurally generated content, no two playthroughs will be the same, making "AI Exploration: A Journey Through the Unknown" a new and exciting sci-fi adventure every time you play.
```

## Overview

This website is setup to be deployed on firebase.

## Setup

In the `website` and the `functions` folders install the project dependencies with

```
yarn
```

In the `functions` folder copy the contents of the `.env-template` into a `.env` file.

## Run website

You can run the website locally with:

```
yarn start
```

## Run cloud functions locally

To be able to fetch the chapters you need to run the cloud functions locally first. To do that, you need to run the following command from the `functions` folder:

```
yarn serve
```
