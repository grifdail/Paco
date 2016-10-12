import {readFileSync, writeFile, mkdir, readdirSync, statSync, writeFileSync} from "fs";
import {join, extname } from "path";
import {remote} from 'electron';
import {ncp} from 'ncp';
import {generate as shortId} from "shortid";
const app = remote.app;


export const loadState = (projectPath) => {
  try {
    return JSON.parse(readFileSync(join(projectPath, "game.json")));
  } catch (e) {
    return null;
  }
}



export const saveLastOpenedProject = (path) => {
  console.log("save");
  return localStorage.setItem("PACO-last-opened-Project", path)
}



export const getLastOpenedProject = () => {
  const pt = localStorage.getItem("PACO-last-opened-Project") || null;
  console.log(pt, exist(pt) , pt , null);
  if (pt) {
    return exist(pt) ? pt : null;
  }
  return null;
}

export const saveState = (st) => {
  const projectPath = st.projectPath;
  const game = st.game;
  saveLastOpenedProject(projectPath);
  if (projectPath) {
    return writeFile(join(projectPath, "game.json"), JSON.stringify(game,null,4));
  }
}

export const setUpProject = (projectPath) => {
  ncp(join(__dirname,"..","export"), projectPath, (...args) => console.log(args) )
}
export const saveImage = (projectPath, file) => {
  const name = shortId();
  const ext = extname(file);
  const newName = name+ext;
  writeFileSync(join(projectPath,"images", newName ), readFileSync(file));
  return newName;
}



const exist = (filePath) => {
  try
    {
        return statSync(filePath).isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

function ensureExists(path, mask, cb) {
    mkdir(path, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}
