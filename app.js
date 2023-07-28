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
    // const response = await sendZenprompt(openAi);
    // const imagePrompt = await sendPrompt(openAi, `'${response}', based on the this story create prompts so that i can give it to an image genrating ai to give me images to accompany each part of the story,also make sure the prompts are relatable to other prompts so that it can generate images as if they are same part of the story,limit it to only 5 prompts with much detailin prompt  so that it can capture peoples attention and generate much better image bringing life to the story     `)
    const imagesUrl = await sendImagePrompt(openAi)

    // console.log(imagePrompt);
    // console.log(response);
    console.log(imagesUrl);
}

// main();
sendEmailImagesAndPrompts()




