import React, { useState, useEffect } from "react";

import { observer } from "mobx-react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DeleteIcon from "@mui/icons-material/Delete";

import useStores from "../../hooks/useStores";
import DocumentsStore from "../../stores/documents/DocumentsStore";

const DocumentsList = () => {
  const [open, setOpen] = useState(true);
  const stores = useStores();
  const documentsStore = stores.documentsStore as Required<DocumentsStore>;

  useEffect(() => {
    documentsStore.getList();
  }, [documentsStore]);

  console.log("list is: ", documentsStore.list[0]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = (id: string) => (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    
    documentsStore.delete(id);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Document List Items
        </ListSubheader>
      }
    >
      {documentsStore.list.map((document) => {
        return (
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={document.title} />
            <ListItemIcon onClick={handleDelete(document.id)}>
              <DeleteIcon />
            </ListItemIcon>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default observer(DocumentsList);

// const DocumentsList = ({ documentsStore } : any) => {
//   const [open, setOpen] = useState(true);
//   // const stores = useStores();
//   // const documentsStore = stores.documentsStore as Required<DocumentsStore>;

//   useEffect(() => {
//     documentsStore.getList();
//   }, [documentsStore]);

//   console.log('list is: ', documentsStore.list[0]);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   const handleDelete = (e: React.MouseEvent<any>) => {
//     e.stopPropagation();
//     console.log("delete");
//   };

//   return (
//     <List
//       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
//           Document List Items
//         </ListSubheader>
//       }
//     >
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Inbox" />
//         <ListItemIcon onClick={handleDelete} >
//           <DeleteIcon />
//         </ListItemIcon>
//       </ListItemButton>
//     </List>
//   );
// };

// export default inject((allStore: RootStore) => ({
//   documentsStore: allStore.documentsStore
// }))(observer(DocumentsList));
