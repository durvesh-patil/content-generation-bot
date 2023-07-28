exports.sendZenprompt = async (openAi) => {

    try {
        const prompt = `Assume you are a storyteller and a zen meditation trainer.
            Your goal is to onboard more people into trying zen meditation with the help of spreading out its benefits and advantages using stories regarding peace mindfulness calmness concentration etc.
            Create a unique short story and a quote at the end   which would inspire people to try zen meditation`

        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 500

        });

        // console.log(response.data.choices[0].text);

        return response.data.choices[0].text;



    } catch (error) {
        console.log(error);


    }

}

exports.sendPrompt = async (openAi, prompt) => {
    const response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 500

    });

    return response.data.choices[0].text;


}