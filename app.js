const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv');
const express = require('express')
const { sendZenprompt, sendPrompt, sendImagePrompt } = require('./prompts/get-prompts')
const { sendEmailImagesAndPrompts } = require('./utils/email')



dotenv.config({ path: "./config.env" })

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    url: `https://api.openai.com/v1/chat/completions`
})

const openAi = new OpenAIApi(configuration);

const main = async () => {
    try {
        // const text = `1. A farmer amidst nature and the beauty of environment. 
        // 2. A farmer practicing zen meditation, focusing and sinking into a peaceful state.       
        // 3. A group of monks visiting the farmer and teaching him advanced meditation techniques. 
        // 4. The villagers learning from the farmer and finding inner peace and balance.
        // 5. The farmer reflecting on the journey and the wisdom it brings.`;

        const story = await sendZenprompt(openAi);
        const imagePrompt = await sendPrompt(openAi, `'${story}', based on the this story create prompts so that i can give it to an image genrating ai to give me images to accompany each part of the story,also make sure the prompts are relatable to other prompts so that it can generate images as if they are same part of the story,limit it to only 5 prompts and make sure the prompts are in very very detail so that the AI can generate a beautifull and mesmerising images .After each prompt add "|||"      `)
        console.log(story);
        console.log(imagePrompt);
        const imagePromptsArray = imagePrompt.split("|||").filter(Boolean).map((item) => item.trim())
        console.log(imagePromptsArray);
        let imagesUrl = [];



        let content = story.split('|||').filter(Boolean).map((item) => item.trim());
        console.log(content);

        for (let i = 0; i < imagePromptsArray.length; i++) {
            const imageUrl = await sendImagePrompt(openAi, imagePromptsArray[i])
            imagesUrl[i] = `For paragraph${i}: ${imageUrl} `
            console.log("image done ");

            await new Promise((resolve) => setTimeout(resolve, 10000));


        }








    } catch (err) {
        console.log(err);
    }
}

main();






