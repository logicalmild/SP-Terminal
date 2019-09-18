var ArrQ = [];
var ArrA = [];
var QuestionATC = {

    1:{
        Question:'Who Is An Air Traffic Controller (atc)?',
        Answer:'An ATC is a person who coordinates the movement of air traffic, to ensure that aircraft stay safe distances apart.'
    },
    2:{
        Question:'Why An Atc?',
        Answer:'Because I have a great potential to manage things, and my education also meets the required qualification skills where have complete the training for an ATC and I feel that I can use my knowledge and experience in a resourceful way for this job.'
    },
    3:{
        Question:'At Which Position Do You Work As An Atc?',
        Answer:'There are basically three positions: Junior Executive, Senior Assistant and a Manager. Tell them about what position you are applying for.'
    },
    4:{
        Question:' What Is The Job Of A Junior Executive Atc?',
        Answer:'A Junior Executive has to keep track of all the flights which are arriving and departing at a particular time. In-case if there are two different flights arriving or departing at the same time then he needs to report he Senior Assistant.'
    },
    5:{
        Question:'What Is The Duty Of A Senior Assistant?',
        Answer:'Senior Assistant is responsible for Instructing the pilots about their movements. A senior assistant takes reports from the Junior Executive and reports to the Manager for instructions at extreme  cases.'
    },
    6:{
        Question:'What Is The Job Of A Manager?',
        Answer: 'A manager is responsible to instruct the Junior executives and the Senior Assistants and collect reports from them on weekly, monthly and annual basis.'
    },
    7:{
        Question:'What Are The Different Kinds Of Roles Played In The Job Of An Atc?',
        Answer:'There are basically three roles and the employees assigned to each role are called as the controllers:\nTower Controllers\nArrival and Departure Controllers\nEn route Controller'
    },
    8:{
        Question:'Who Is A Tower Controller?',
        Answer:'Tower controllers are responsible for directing the movements of vehicles on runways. They check flight plans and give clearance for the pilots for landing or taking off.'
    },
    9:{
        Question:'Who Is A A&d Controller?',
        Answer:'Arrival and Departure Controllers take care that an aeroplane lands or departs safely and also maintains a minimum space from the other vehicles for safety. They are also responsible for informing the pilots about the weather and forecast conditions.'
    },
    10:{
        Question:'Who Is An En Route Controller?',
        Answer:'En route controllers monitor aircraft once they leave an airport\'s airspace. They work at air route traffic control centers located throughout the country, which typically are not located at airports.'
    },
    11:{
        Question:'What Challenges Are You Looking For In This Air Traffic Controller Position?',
        Answer:'There can be various challenges for me in this job and sometimes a few challenges can also risk someone’s life and my duty will be find the best possible solutions so that there is no damage caused to anyone.'
    },
    12:{
        Question:'Suppose You Are From Goa And Given To Select Between A Job At Goa International Airport Or New Delhi International Airport, Which Job Will You Select?',
        Answer:'New Delhi International Airport.'
    },
    13:{
        Question:'Why New Delhi International Airport?',
        Answer:'Goa will be closer to my house and easier for me to travel from my home to my workspace, but New Delhi has more number of flights arriving and departing in a day, which will give me a better opportunity to prove my skills and progress further in my career.'
    },
    14:{
        Question:'What Do You Feel About The Competition For Job In The Profession?',
        Answer:'The competition level is bit too high and it has to be as this job requires a lot responsibilities to be handled. But then too I feel that there is always a space for highly qualified and disciplined ATCs.'
    },
    15:{
        Question:'Suppose There Is A Delay In Flights And A Few Flights Are Already On A Runway And Two More Are About To Come. What Would You Do In That Situation?',
        Answer:'I will instruct incoming flights to hold in the air for a while and reduce its travelling speed so that in that time I can instruct the pilots of the other flights who are standing on the runway to move to some other place.'
    },
    16:{
        Question:'Suppose It Is Raining Heavily In Your City But If It Is All Clear At The Place Where The Flight Has To Reach. Would You Allow The Flight To Take Off?',
        Answer:'no, because there are chances of accidents while taking off from the ground. And if the signals mess up, the flight can also result in getting directed to some other direction.'
    },
    17:{
        Question:'Suppose Some Flight Wants To Take Some Emergency Landing At Your Airport, Can You Handle It?',
        Answer:'Say yes only if you can, else don’t worry, simply say no. They will appreciate your honesty and  train you for it if you are selected.'
    },
    18:{
        Question:'Suppose If Some Things Go Technically Wrong And The Engineer Is Absent, Can You Handle It?',
        Answer:'Say yes only if you can, this won’t affect your job.'
    },
    19:{
        Question:'Did The Salary We Offer You Attract You For This Job?',
        Answer:'Every employee wishes to have a better salary and jobs with higher salary do attract people, but besides that your company is well established and I will also get more opportunities over here. This was what attracted me more than the salary.'
    },
    20:{
        Question:'Are You Capable Of Leading A Team?',
        Answer:'Say yes only if you know all the functions of a leader and you are equally capable of handling them.'
    },
    // 1:{
    //     Question:'',
    //     Answer:''
    // },
    
};


function ActivateATC(){
    for(i in QuestionATC){
        ArrQ.push(QuestionATC[i].Question);
        ArrA.push(QuestionATC[i].Answer);
    }
    
    terminal.push(function(command){
       if(command == '1'){
        RandomGame();
       }
       else if(command == '2'){
        SequenceGame(0);
       }
       else{
            this.echo('Please choose 1 or 2\n');
       }
       
    },{
        prompt: 'Choose 1 is random game.\nChoose 2 is sequence game.\nChoose > '
    });
}

function RandomGame(){
    
    terminal.push(function(command){
        terminal.clear();   
        ArrQ = ArrQ[Math.floor(Math.random()*ArrQ.length)];
        terminal.echo('Question : ' + ArrQ + '\n');    
        terminal.push(function(command){
            terminal.echo('\nAnswer : ' + ArrA + '\n');    
            RandomGame();

        },{
            prompt: 'Show answer press enter.'
        });

    },{
        prompt: 'Press enter for random question.'
    });

}

function SequenceGame(index){
    terminal.push(function(command){
        terminal.clear();       
        terminal.echo('Question '+(index+1)+': ' + ArrQ[index] + '\n');  
        terminal.push(function(command){
            if(index < ArrQ.length){
                terminal.echo('\nAnswer : ' + ArrA[index] + '\n');    
                SequenceGame(index+1);
            }else{
                terminal.clear();  
                terminal.echo('Out of question\n');  
            }
            

        },{
            prompt: 'Show answer press enter.'
        });

    },{
        prompt: 'Press enter for next question.'
    });
}