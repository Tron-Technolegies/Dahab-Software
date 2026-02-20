import React from "react";
import Badge from "@mui/material/Badge";
import { IoNotifications } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import { AnimatePresence, motion } from "framer-motion";

import Loading from "../Loading";
import {
  useGetUnreadNotifications,
  useReadNotification,
} from "../../hooks/notifications/useNotifications";

export default function () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoading, data, error } = useGetUnreadNotifications();
  const { isPending, readNotification } = useReadNotification();

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Dubai", // UAE timezone
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Badge
        badgeContent={data.length}
        color="primary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IoNotifications className="w-6 h-6 cursor-pointer" />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <div className="max-w-[350px] py-5 px-4 max-h-[500px]">
          <p>All Notifications</p>
          <div className="flex flex-col gap-2 my-2">
            {data.length < 1 && <p>No Unread Notifications</p>}
            <AnimatePresence>
              {data.length > 0 &&
                data.map((item) => (
                  <motion.div
                    className="flex gap-2 items-end border-b py-2"
                    key={item._id}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">{item.notification}</p>
                      <p className="text-xs italic">
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-US",
                          options,
                        )}
                      </p>
                    </div>

                    <button
                      onClick={() => readNotification(item._id)}
                      className="font-semibold"
                    >
                      X
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </Menu>
    </div>
  );
}
