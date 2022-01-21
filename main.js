song="";
objects=[];
status="";
function preload()
{
    song=loadSong('alert.mp3')
}
function setUp()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}
function draw()
{
    image(video,0,0,480,380)
    console.log("status="+status);
    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are : "+objects.length;

            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke('black');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects"
}
function modelLoaded()
{
    console.log("Model loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
