package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"path/filepath"
)

import (
	"github.com/gorilla/mux"
)

/*
//SPRBUS example
//to use, also uncomment the /state/api line in docker-compose.yml
import (
	"github.com/spr-networks/sprbus"
)

func handleDnsEvent(topic string, value string) {
	fmt.Println(topic, value)
}

func busListener() {
	go func() {
		for i := 30; i > 0; i-- {
			err := sprbus.HandleEvent("dns:serve:", handleDnsEvent)
			if err != nil {
				log.Println(err)
			}
			time.Sleep(3 * time.Second)
		}
		log.Fatal("failed to establish connection to sprbus")
	}()
}

*/

var UNIX_PLUGIN_LISTENER = "/state/plugins/sample_plugin/socket"

// set up SPA handler. From gorilla mux's documentation
type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	path = filepath.Join(h.staticPath, path)
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func pluginTest(w http.ResponseWriter, r *http.Request) {
	//http.Error(w, "Not implemented", 400)
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "\"hello world\"")
}

func logRequest(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}

func main() {
	unix_plugin_router := mux.NewRouter().StrictSlash(true)

	unix_plugin_router.HandleFunc("/test", pluginTest).Methods("GET")

	// map /ui to /ui on fs
	spa := spaHandler{staticPath: "/ui", indexPath: "index.html"}
	unix_plugin_router.PathPrefix("/ui").Handler(spa)

	os.Remove(UNIX_PLUGIN_LISTENER)
	unixPluginListener, err := net.Listen("unix", UNIX_PLUGIN_LISTENER)
	if err != nil {
		panic(err)
	}

	pluginServer := http.Server{Handler: logRequest(unix_plugin_router)}

	pluginServer.Serve(unixPluginListener)

	// TODO serve static
}
