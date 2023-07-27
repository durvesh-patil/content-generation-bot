const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv');
const express = require('express')

const app = new express();

dotenv.config({ path: "./config.env" })

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openAi = new OpenAIApi(configuration);

// app.post("/find-complexity", async (req, res) => {
//     try {

//         const response = await openAi.createCompletion({
//             model: "text-davinci-003",
//             prompt: `console.log("hello")
//              The time complexity of this function is
//               ###`
//         });


//         return res.status(200).json({
//             status: "success",
//             message: `${response.data.choices[0].text}`
//         })
//     } catch (error) {
//         return res.status(400).json({
//             status: "failed",
//             message: `${error}`
//         })

//     }
// })
let sum = false

const sendZenPrompt = async () => {
    try {
        const prompt = sum ? `try a different story ` : `Assume you are a storyteller and a zen meditation trainer.
        Your goal is to onboard more people into trying zen meditation with the help of spreading out its benefits and advantages using stories regarding peace mindfulness calmness concentration etc.
        Create a unique short story/quotes   which would inspire people to try zen meditation`

        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 300

        });


        console.log(response.data.choices[0].text);
    } catch (error) {


    }
}
sendZenPrompt()
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`app running on port ${port}`))


