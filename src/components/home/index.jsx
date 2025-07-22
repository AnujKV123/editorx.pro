import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import { Plus, FileText, Users } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { TeamCard } from "./TeamCard";
import { CreateDocumentModal } from "./CreateDocumentModal";
import ApiService from "../../Services/Api.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../common/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { socket } from "../../socket/webSocket";
import { Loader } from "../common/Loader";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const token = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(false);

  const [teams, setTeams] = useState([
    // {
    //   id: "team-1",
    //   name: "Development Team",
    //   ownerId: "1",
    //   members: ["1", "user-789", "user-456"],
    //   lastModified: new Date("2024-01-16T16:45:00"),
    //   createdAt: new Date("2024-01-05T08:30:00"),
    // },
    // {
    //   id: "team-2",
    //   name: "Design Team",
    //   ownerId: "user-789",
    //   members: ["user-789", "1"],
    //   lastModified: new Date("2024-01-13T12:10:00"),
    //   createdAt: new Date("2024-01-08T10:00:00"),
    // },
  ]);

  async function fetchDocuments() {
    try {
      setIsLoading(true);
      const response = await ApiService.getDocuments(
        { search: debouncedSearch, page: 1, limit: 10 },
        token
      );
      if (response.statusCode === 200) {
        setDocuments(response.data.data);
        setTotalDocuments(response.data.total);
      }
      setIsLoading(false);
    } catch (error) {
      console.info(error);
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchDocuments();
  }, [debouncedSearch]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("invitation:accepted_DOC", ({ to, documentId }) => {
      fetchDocuments();
    });

    return () => {
      socket.off("invitation:accepted_DOC");
    };
  }, [socket]);

  return (
    <div>
      <div className="flex flex-row w-full gap-2 p-4">
        <div className="w-6/12">
          <Search search={searchQuery} setSearch={setSearchQuery} />
        </div>
        <div className="">
          <Button onClick={() => setIsDocumentModalOpen(true)}>
            <FileText className="mr-2 w-5 h-5" /> Create Document
          </Button>
        </div>
        {/* <div className=" ">
          <Button>
            <Users className="mr-2 w-5 h-5" /> Create Team
          </Button>
        </div> */}
      </div>
      <div className="p-4">
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-foreground">
              My Documents
            </h2>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {totalDocuments}
            </span>
          </div>

          {documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {documents.map((document) => (
                <DocumentCard
                  fetchDocuments={fetchDocuments}
                  isOwner={document.ownerId === user._id}
                  key={document._id}
                  document={document}
                  onClick={() =>
                    navigate(`/document/${document._id}`, {
                      state: {
                        session: document,
                      },
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "No documents found" : "No documents yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No documents match "${searchQuery}"`
                  : "Create your first document to get started"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsDocumentModalOpen(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Create Document
                </Button>
              )}
            </div>
          )}
        </section>

        {/* Teams Section */}
        {/* <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-foreground">My Teams</h2>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {filteredTeams.length}
            </span>
          </div>

          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  currentUserId="1"
                  onClick={() => console.log("Open team:", team.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "No teams found" : "No teams yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No teams match "${searchQuery}"`
                  : "Create your first team to collaborate"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setIsTeamModalOpen(true)}
                  variant="outline"
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Create Team
                </Button>
              )}
            </div>
          )}
        </section> */}
        <CreateDocumentModal
          open={isDocumentModalOpen}
          setOpen={() => setIsDocumentModalOpen(false)}
          fetchDocuments={fetchDocuments}
        />
        {/* <CreateTeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} /> */}
        {isLoading && < Loader />}
      </div>
    </div>
  );
};

export default Home;
