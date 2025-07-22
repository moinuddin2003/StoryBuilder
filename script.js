let storyData = [
  {
    id: 1,
    title: "The 1st One",
    text: "The Forest",
    choices: [
      // { text: "GO Up", linksTo: 2 },
      // { text: "GO Down", linksTo: 3 },
    ],
  },

  {
    id: 2,
    title: "The 2nd One",
    text: "The Lake",
    choices: [],
  },

  {
    id: 3,
    title: "The 3rd One",
    text: "The Cave",
    choices: [],
  },
];



function renderPassage() {

  const container = document.getElementById("container");

  container.innerHTML = ''
  storyData.forEach((story) => {
    const card = document.createElement("div");
    card.className = "card"

    const titleInput = document.createElement("input");
    titleInput.value = story.title 
    // ||`The ${(story.id)+1} One`;
    titleInput.placeholder = "Passage title"

    const textArea = document.createElement('textarea');
    textArea.value= story.text 
    // || 'Default text'
    textArea.placeholder = "Write your story here...";


    titleInput.addEventListener('input', () =>
    {
      story.title = titleInput.value;
    });


    textArea.oninput = () => {
      story.text = textArea.value;
    }

    // we can also do same for textarea as in title input 

    const addchoiceBtn = document.createElement('button');
    addchoiceBtn.innerText = "Add Choice";
    addchoiceBtn.addEventListener('click' , () =>
    {

      if (card.querySelector("form")) return;

      const form = document.createElement('form');
      
      const inputText = document.createElement('input');
      inputText.placeholder = 'Choice Text';

      const selectLink = document.createElement('select');
      storyData
        .filter((p) => p.id !== story.id)
        .forEach((p) => {
          const option = document.createElement("option");
          option.value = p.id;
          option.innerText = `${p.title} (ID: ${p.id})`;
          selectLink.appendChild(option);
        });

      const saveBtn = document.createElement('button');
      saveBtn.innerText = "Save Choice";
      saveBtn.addEventListener('click', (e) =>
      {
        e.preventDefault();

        const newChoice = {
          text:inputText.value,
          linksTo:parseInt(selectLink.value)
        }

        story.choices.push(newChoice)
        // container.innerHTML = '';
        renderPassage()
      })

      form.appendChild(inputText);
      form.appendChild(selectLink);
      form.appendChild(saveBtn)
      card.appendChild(form)
      // renderPassage()
    })

    story.choices.forEach(

      (choice,index) => {

          
        const choiceWrapper = document.createElement("div");
        choiceWrapper.className = "choice";
        const choiceBtn = document.createElement('button');
        choiceBtn.innerText = `${choice.text} → ID: ${choice.linksTo}`;


        const deletBtn = document.createElement('button');
        deletBtn.innerText = "Delete Choice";

        deletBtn.addEventListener('click', ()=>
        {
          story.choices.splice(index,1);
          renderPassage();
        })
          choiceWrapper.appendChild(choiceBtn)
          choiceWrapper.appendChild(deletBtn);
          card.appendChild(choiceWrapper)
      }
    );

    const deletPassage = document.createElement('button');
deletPassage.innerText = 'DeletePassage'

deletPassage.addEventListener('click',() =>
{
  storyData = storyData.filter(p => p.id !== story.id);
  renderPassage();
});
    // choiceBtn.addEventListener('click' , ())
   

        card.appendChild(titleInput);
    card.appendChild(textArea);
    card.appendChild(addchoiceBtn);
    // card.appendChild(addNewPassage);
    card.appendChild(deletPassage);
    container.appendChild(card)
});


const addNewPassage = document.createElement('button');
addNewPassage.innerText = "Add New Passage";

addNewPassage.addEventListener('click', () =>
{
  storyData.push(
    {
      id:storyData.length+1,
      title: "",
      text: "",
      choices: []
    });
    renderPassage()
});
    container.appendChild(addNewPassage);
  };

  renderPassage();

