#!/usr/bin/env node

const username = false,
  password = false,
  appid = false,
  buildFolder = false,
  buildTarget = false;

var client = require('phonegap-build-api'),
  archiver = require('archiver'),
  fs = require('fs'),
  e = require('debug')('error'),
  i = require('debug')('info');

if(username === false || password === false || appid === false || buildFolder === false || buildTarget === false) {
  e('username,password,appid,buildfolder or buildtarget missing');
  return;
}

i('authenticating with phonegap');

client.auth({ username: username, password: password }, function(err, api) {
  if(err){
    e(err);
    throw err;
  };

  i('creating temp.zip');

  var output = fs.createWriteStream(buildTarget);
  var archive = archiver('zip', { zlib: { level: 9 }});

  output.on('open', ()=>{
      i('adding contents');
      archive.pipe(output);
      archive.directory(buildFolder, false);
      archive.finalize();
  });

  output.on('end', ()=>{
    i('data drained');
  });

  output.on('close', ()=>{
    i(archive.pointer() + ' total bytes.');

    i('uploading...');
    api.put(`/apps/${appid}`,{
      form: {
        data: {
          debug: false
        },
        file: buildTarget
      }
    },
      (err,data)=>{
        if(err){
          e(err);
          throw err;
        }

        i('finished uploading');

        i('deleting file');
        fs.unlink(buildTarget, (err)=>{
          if(err){
            e(err);
            throw err;
          }
          i('temp file deleted');
        })
      }
    );
  });

  archive.on('error', (err)=>{ e(err); throw err; })

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      i("WARNING " + err);
    } else {
      e(err);
      throw err;
    }
  });
});
