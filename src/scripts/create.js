const fs = require('fs');
const exec = require('child_process').exec;
const component = process.argv[2];
// source قراءة الملف القالب الذي سيقوم بعمل نسخة منه ووضعها في المتغير 
fs.readFile("./src/components/template.html", "utf-8", (err, source) => {
  if (err) return console.error(err);
  const content = source.replace(/COMPONENT_NAME/g, component) // component استبدال هذه الكلمة الاولى بالكلمة في المتغير
  // التأكد من عدم وجود ملف بنفس الاسم
  if (fs.existsSync(`./src/components/${component}.html`)) {
    return console.error(`${component}.html is already exist, please try different name!`);
  }
  // html انشاء الملف المراد
  fs.writeFile(`./src/components/${component}.html`, content, (err) => {
    if (err) return console.error(`there is a problem with creating ${component}.html file!`);
    // scss انشاء الملف المراد
    fs.writeFile(`./src/assets/sass/components/${component}.scss`, '', (err) => {
      if (err) return console.error(`there is a problem with creating ${component}.scss file!`);
      console.log(`${component} created successfully!`);
      fs.appendFile('./src/assets/sass/components/_components.scss', `@import '${component}.scss';\n`, (err) => {
        if (err) return console.error(`there is a problem with creating ${component}.scss file!`);
        console.log(`${component}.scss is created successfully!`);
      })
      // VSC فتح الملفات التي تم انشاءها في واجهة 
      exec(`code -r ./src/components/${component}.html`, (err) => {
        if (err) return console.error(err)
      });
      exec(`code -r ./src/assets/sass/components/${component}.scss`, (err) => {
        if (err) return console.error(err)
      });
    });
  });
});